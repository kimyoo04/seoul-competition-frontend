import Link from "next/link";

export default function CommentUpDelButtons() {
  return (
    <div className="text-sm">
      {/* <Link href="/commentsy"> */}
        <button className="m-0.5 rounded-lg bg-gray_2 px-2 py-1 text-font_white">
          수정
        </button>
      {/* </Link> */}
      <button className="m-0.5 rounded-lg bg-alert_danger px-2 py-1 text-font_white">
        삭제
      </button>
    </div>
  );
}
