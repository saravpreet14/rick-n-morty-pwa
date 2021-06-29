import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import path from "path";
import fs from "fs";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Sprinklr Sign in",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const dataFilePath = path.join(process.cwd(), "validation.json");
        // console.log(dataFilePath);
        const fileContents = fs.readFileSync(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);
        var username = credentials.username;
        var password = credentials.password;
        // console.log(data);
        var user = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].username == username && data[i].password == password) {
            user = {
              id: i,
              name: credentials.username,
              email: credentials.username + "@sprinklr.com",
            };
            break;
          }
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
