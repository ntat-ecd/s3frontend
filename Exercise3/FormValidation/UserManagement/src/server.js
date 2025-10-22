import { createServer, Model, Response } from "miragejs";
const [MOCK_USER, MOCK_PASSWORD] = ["test1234", "test1234"];
const users = [
  {
    id: 1,
    name: "Ngô Yến Nhi",
    email: "nhimini@gmail.com",
    updatedAt: "08/07/2025",
    status: true,
  },
  {
    id: 2,
    name: "Đinh Lam Trọng",
    email: "zkusi@gmail.com",
    updatedAt: "11/02/2025",
    status: false,
  },
  {
    id: 3,
    name: "Hoàng Ngọc Bích Thy",
    email: "thy.ngoc039@gmail.com",
    updatedAt: "03/07/2025",
    status: false,
  },
  {
    id: 4,
    name: "Mai Văn Vũ",
    email: "vvm_sg@gmail.com",
    updatedAt: "09/10/2025",
    status: true,
  },
];
export const setupServer = () => {
  let server = createServer({
    models: {
      user: Model,
      authUser: Model,
    },
    seeds(server) {
      users.map((user) => {
        server.create("user", user);
      });
    },
    routes() {
      this.namespace = "api";
      //---AUTH ROUTE---
      //SIGN UP
      this.post("/register", (schema, request) => {
        const payload = JSON.parse(request.requestBody);

        //check for existing user

        const existingUser = schema.authUser;
      });
      //SIGN IN
      this.post("/login", (schema, request) => {
        const { userName, userPassword } = JSON.parse(request.requestBody);

        if (userName === MOCK_USER && userPassword === MOCK_PASSWORD)
          return {
            authUser: { name: MOCK_USER, token: "mirage-jwt-token" },
          };
        else
          return new Response(
            401,
            {},
            { message: "Invalid credentials.\nPlease check again." }
          );
      });
      //---USER MANAGEMENT ROUTE---

      //GET
      this.get("/users", (schema) => {
        return schema.users.all();
      });
      //POST - ADD
      this.post("/users", (schema, request) => {
        const payload = JSON.parse(request.body);
        return schema.users.create(payload);
      });
      //PATCH - UPDATE
      this.patch("/users/:id", (schema, request) => {
        const id = request.params.id;
        const payload = JSON.parse(request.requestBody);
        const userToUpdate = schema.users.find(id);
        if (!userToUpdate) {
          return new Response(404, {}, "User not found");
        }
        userToUpdate.update(payload);
        return userToUpdate;
      });
      //DELETE
      this.delete("/users/:id", (schema, request) => {
        const id = request.params.id;
        const userToDelete = schema.users.find(id);

        if (!userToDelete) return new Response(404, {}, "User not found");

        userToDelete.destroy();
        return new Response(204);
      });

      //DEBUGGING
      this.get("/_debug/db", (schema) => schema.db.dump());
    },
  });
  window.server = server;
  return server;
};
