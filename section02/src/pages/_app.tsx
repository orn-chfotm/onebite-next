import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  /**
   * Link tag => <a></a> 태그와 같은 형식으로 페이지 이동을 CSR 처리
   * => <a></a> 태그를 사용할 시 매번 서버에 요청을 하는 SSR 처리가 된다.
   *
   * useRouter.push();
   * 함수나 로직안에서 페이지를 이동시킬 때 CSR 처리를 활용하기 위한 방식
   *
   * js location의 내장 함수처럼 replace(), back()함수도 존재한다.
   */

  /**
   * pre-fetching
   *
   * 로드된 페이지에 연관된 연결페이지의 JS bundle을 미리 불러오는 동작
   *
   * <Link> 태그의 경로의 js 는 자동을 불러오지만
   * useRouter를 사용한 페이지의 js 는 별도의 설정이 필요하다.
   *
   * router.prefetch(페이지 경로);
   * 로 직접 prefetch 대상에 대한 명시가 필요하다.
   */
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
  };

  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        {/* Link 태그의 prefetch를 명시적으로 해제하고 싶은 경우 Link 속성 prefetch에 false 값을 부여 */}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
