import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(),
    nickName: "",
    email: "",
  },
});

db.user.create({
  id: 1,
  nickName: "0seo8",
  email: "00seo23@gmail.com",
});
