export const proxy = async () => {
  // QUITAR COMENTARIOS CUANDO SE CREE UN NUEVO PROYECTO
  // const cookieStore = await cookies();
  // const cookie = cookieStore.get("msp");
  // const token = cookie?.value;
  // const host = process.env.NEXT_PUBLIC_SERVER_FRONTEND || "";
  // const port = process.env.LOGIN_FRONTEND_PORT || "3001";
  // const url = "http://" + host + ":" + port + "/login";
  // try {
  //   if (!token) {
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // } catch (e) {
  //   console.error("Error verificando token en middleware", e);
  //   return NextResponse.redirect(url);
  // }
};

export const config = {
  matcher: [
    "/((?!_next/|favicon.ico|static/|images/|fonts/|api/|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.gif|.*\\.ico).*)",
  ],
};
