import { matchCheckComment } from "@api/comment/matchCheckComment";
import { alertActions } from "@features/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import {
  ICommentOrReview,
  IMatchCheckCommentOrReviewForm,
} from "@type/commentOrReview";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { buttonActions } from "@features/button/buttonSlice";
import { matchCheckReview } from "@api/review/matchCheckReview";

export default function CommentUpdatePwd({ data }: { data: ICommentOrReview }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { beforeDelete, beforeUpdate } = useAppSelector(
    (state) => state.button
  );

  const { register, handleSubmit } = useForm<IMatchCheckCommentOrReviewForm>({
    defaultValues: {},
  });

  const onValid: SubmitHandler<IMatchCheckCommentOrReviewForm> = async ({
    password,
  }) => {
    if (router.pathname.split("/")[1] === "posts") {
      const isCommentMatch = await matchCheckComment({
        id: data.id,
        password,
      });
      if (!isCommentMatch) {
        // 경고창 활성화
        dispatch(
          alertActions.alert({
            alertType: "Warning",
            content: "비밀번호가 일치하지 않습니다.",
          })
        );
        return;
      } else {
        dispatch(buttonActions.updatePwdCheck(password));

        // // 성공 알람 활성화
        // dispatch(
        //   alertActions.alert({
        //     alertType: "Success",
        //     content: "댓글이 수정되었습니다.",
        //   })
        // );
      }
    } else {
      const reviewData = {
        educationId: router.query.id as string,
        id: data.id,
        password,
      };
      const isReviewMatch = await matchCheckReview({
        id: reviewData.id,
        password: reviewData.password,
      });

      if (!isReviewMatch) {
        // 경고창 활성화
        dispatch(
          alertActions.alert({
            alertType: "Warning",
            content: "비밀번호가 일치하지 않습니다.",
          })
        );
        return;
      } else {
        dispatch(buttonActions.updatePwdCheck(password));

        // // 성공 알람 활성화
        // dispatch(
        //   alertActions.alert({
        //     alertType: "Success",
        //     content: "댓글이 수정되었습니다.",
        //   })
        // );
      }
    }
  };

  return (
    <>
      {beforeDelete && beforeUpdate ? (
        <form
          onSubmit={handleSubmit(onValid)}
          className="row-center relative gap-2"
        >
          <div className="absolute right-0 top-8">
            <input
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",

                minLength: {
                  value: 4,
                  message: "최소 4 글자 이상 입력해 주세요.",
                },
                maxLength: {
                  value: 12,
                  message: "최대 12 글자까지 입력할 수 있어요.",
                },
              })}
              id="password"
              type="password"
              name="password"
              autoComplete="off"
              placeholder="4 자 이상"
              maxLength={13}
              className=" h-8 w-[100px] rounded-lg placeholder:text-sm placeholder:font-bold placeholder:text-gray_2"
            />
          </div>

          {/* 댓글 수정 확인 버튼 */}
          <button type="submit" className="delete_btn">
            확인
          </button>

          {/* 댓글 수정 취소 버튼 */}
          <div
            className="create_btn cursor-pointer"
            onClick={() => dispatch(buttonActions.setBeforeDelete(false))}
          >
            취소
          </div>
        </form>
      ) : (
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="update_btn mr-2"
          onClick={() => dispatch(buttonActions.setBeforeUpdate(true))}
        >
          수정
        </motion.button>
      )}
    </>
  );
}
