import { redirect } from "next/navigation";

export default function Index() {
  // 프로토타입: 진입 시 홈으로. (로그인 화면은 /login)
  redirect("/home");
}
