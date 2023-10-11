import { rest } from "msw"

export const handlers = [
  rest.post("http://localhost:3000/api/v1/user/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "username",
        email: "email",
        _id: "_id",
        token: "token",
        image: "image",
      })
    )
  }),
  rest.post("http://localhost:3000/api/v1/user/verify", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: "username",
        email: "email",
        _id: "_id",
        image: "image",
      })
    )
  }),
]
