import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./users.module.css";
import { deleteUser, getUsers } from "@/network";
import { UserModal } from "./userModal";
import { IApiResId, IUsers } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Users() {
  const users = await getUsers();

  return (
    <section className={cn(styles.userSec, "wrapper")}>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/users?type=create">
          <Button variant="outline" type="submit">
            Create User
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length ? (
            users.map((user: IUsers & IApiResId, index: number) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.avatar && (
                    <Image
                      src={user.avatar}
                      width={50}
                      height={50}
                      alt="user-profile image"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <>
                    <Link href={`/users?type=edit&id=${user.id}`}>
                      <Button className="me-3 float-left">Edit</Button>
                    </Link>
                    <form action={deleteUser.bind(null, user.id)}>
                      <Button variant={"destructive"}>Delete</Button>
                    </form>
                  </>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UserModal />
    </section>
  );
}
