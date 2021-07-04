import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import path from "path";
import fs from "fs";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Sprinklr Sign in",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const dataFilePath = path.join(process.cwd(), "validation.json");
        const fileContents = fs.readFileSync(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);
        // console.log(typeof credentials, credentials);
        var username = credentials["username"] as string;
        var password = credentials["password"] as string;
        var user: { id: number; name: string; email: string } = null;
        for (let i = 0; i < data.length; i++) {
          if (data[i].username == username && data[i].password == password) {
            user = {
              id: i,
              name: username,
              email: username + "@sprinklr.com",
            };
            break;
          }
        }
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
