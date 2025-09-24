// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "../components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// getServerSideProps 예약된 함수명 SSR 처리
// 사전 렌더링 단계에서 딱 한번만 실행 - 오직 서버 측에서만 실행되는  함수
// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
// SSR 방식 - getServerSideProps
// export const getServerSideProps = async () => {
//   // const allBooks = await fetchBooks();
//   // const recoBooks = await fetchRandomBooks();

//   // 비동기 병렬 처리
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   // return은 반드시 props라는 객체 프로퍼티를 포함하는 단 하나의 객체
//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// SSG 방식 - getStaticProps
export const getStaticProps = async () => {
  console.log("인덱스 페이지");

  // 비동기 병렬 처리
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  // return은 반드시 props라는 객체 프로퍼티를 포함하는 단 하나의 객체
  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

// 렌더링 소스 Home 역시 사전 렌더링으로 인해 Server 측에서 한번,
// 브라우저단에서 하이드레이션 과정에서 한번 총 2번 실행된다.
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 브라우저 단에서만 실행되어야 할 코드는 useEffect()를 사용하자
  // useEffect(() => {
  //   console.log(window);
  // }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map(book => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
