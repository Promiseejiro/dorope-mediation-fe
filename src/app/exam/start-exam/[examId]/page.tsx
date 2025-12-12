import ExamAuthentication from "@/components/pages/exam/ExamAuthentication";

interface PageProps {
  params: {
    examId: string;
    school: string;
  };
}

export default async function StartExamPage({ params }: PageProps) {
  const { examId, school } = await params;
  return <ExamAuthentication examId={examId} school={school} />;
}
