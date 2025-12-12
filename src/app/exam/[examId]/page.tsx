import ExamPage from "@/components/pages/exam/ExamPage";

interface PageProps {
  params: {
    examId: string;
  };
}

export default async function ExamRoute({ params }: PageProps) {
  const { examId } = await params;

  return <ExamPage examId={examId} />;
}
