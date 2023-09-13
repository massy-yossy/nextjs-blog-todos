import Link from "next/link";
import Layout from "../components/Layout";
import { getAllTaskData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

// SSG
export async function getStaticProps() {
  const staticFilterTasks = await getAllTaskData();
  return {
    props: { staticFilterTasks },
    revalidate: 3,
  };
}
//クライアントフェッチ用
const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({ staticFilterTasks }) {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticFilterTasks,
  });
  // 新しい順に並べ替える
  const filterTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // 一回だけ実行できるようにする
  useEffect(() => {
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title="Task page">
        <TaskForm taskCreated={mutate}/>
        <ul>
          {filterTasks &&
            filterTasks.map((task) => (
              <Task key={task.id} task={task} taskDelete={mutate} />
            ))}
        </ul>
        <Link href="main-page">
          <div className="flex cursor-pointer mt-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </Link>
        <span>Back to main page</span>
      </Layout>
    </StateContextProvider>
  );
}
