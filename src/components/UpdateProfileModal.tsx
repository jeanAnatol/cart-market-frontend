import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateProfileSchema} from "../schemas/updateProfileSchema.ts";
import {updateProfile} from "../services/updateProfile.ts";

type Props = {
  user: {
    username:string;
    email:string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateProfileModal({user, onClose, onSuccess}: Props) {
  
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email
    },
  });
  
  const onSubmit = async (data: any)=> {
    await updateProfile(data);
    onSuccess();
    onClose();
  }
  
  return (
    <>
      <div className="bg-gray-400 border border-gray-700 rounded mt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-6 rounded w-full max-w-l grid grid-cols-4"
        >
          <div className="">
          <h2 className="text-xl font-bold">Edit Profile</h2>
      </div>
          <div className="">
          <input {...register("username")} className="input mb-5 bg-white rounded"/>
          <input {...register("email")} className="input bg-white rounded" />
      
          <hr className="my-4" />
          </div>
          <div className="mb-4">
          <input
            type="password"
            placeholder="Current password"
            {...register("currentPassword")}
            className="input mb-4 bg-white rounded"
          />
            <input
              type="password"
              placeholder="New password"
              {...register("newPassword")}
              className="input mb-4 bg-white rounded"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="input bg-white rounded"
            />
          </div>
          <div></div>
          <div></div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="text-white bg-red-900 p-2 rounded">
              Cancel
            </button>
            <button type="submit" className="text-white bg-green-900 p-2 rounded">Save</button>
          </div>
          
        </form>
      </div>
    </>
  )
}