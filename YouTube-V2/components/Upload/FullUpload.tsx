"use client";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { TfiUpload } from "react-icons/tfi";
import { VscPass } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SelectCategories } from "@/lib/constants";
import UploadedVideo from "./UploadedVideo";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ThumbnailUpload from "./ThumbnailUpload";
import { UploadDoc } from "@/appwrite/Hooks";
import { appwriteConfig } from "@/appwrite/config";

// form velidation
const formSchema = z.object({
  Title: z
    .string()
    .min(1, { message: "Title required" })
    .max(100, { message: "More Than 100 words" }),
  Description: z
    .string()
    .min(1, { message: "Description Required" })
    .max(5000, { message: "More than 500 words" }),
  Category: z.string().min(1, { message: "Please select category" }),
  Thumbnail: z.custom<File[]>(),
});

interface FullUploadProps {
  videoUrl: File | string | URL;
  uploadPercentage: number;
  duration: number;
  setClose: (close: boolean) => void;
  videoAssetName: string;
}

const FullUpload = ({
  videoUrl,
  uploadPercentage,
  duration,
  setClose,
  videoAssetName,
}: FullUploadProps) => {
  const [thumbnail, setThumbnail] = useState<string | URL | undefined | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {}, [session]);

  const defaultValues = {
    Title: videoAssetName,
    Description: "",
    Category: "",
    Thumbnail: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // submit values
  const onSubmit = (values: {}) => {
    console.log(values);

    setIsLoading(true);
    try {
      setIsLoading(true);
      const uploadDetails = {
        ...values,
        VideoUrl: videoUrl,
        duration: duration,
        isLive: false,
        ChannelId: "12345",
      };
      console.log(uploadDetails);
      UploadDoc(appwriteConfig.videoCollectionId, uploadDetails);
      setIsLoading(false);
      setClose(false);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  // console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h2 className="mb-3 font-bold text-lg pl-6">Details</h2>
          <div className="md:flex block gap-8 p-6">
            <div className="md:w-[63%] w-full mb-6 overflow-y-auto h-[520px] pr-2 space-y-5">
              {/* title */}
              <FormField
                control={form.control}
                name="Title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Title (required){" "}
                      <AiOutlineQuestionCircle className="h-6 w-6" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Title"
                        {...field}
                        className="inputClass focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* description */}
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Description (required){" "}
                      <AiOutlineQuestionCircle className="h-6 w-6" />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Description"
                        {...field}
                        className="inputClass focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* categories */}
              <FormField
                control={form.control}
                name="Category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Category (required)
                      <AiOutlineQuestionCircle className="h-6 w-6" />
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SelectCategories.map((item, id) => (
                          <SelectItem key={id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Uplaod Thumbnail */}

              <FormField
                control={form.control}
                name="Thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ThumbnailUpload
                        thumbnail={thumbnail}
                        setThumbnail={setThumbnail}
                        disabled={isLoading}
                        onChange={(thumbnail) => field.onChange(thumbnail)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:w-[37%] w-full">
              <UploadedVideo url={videoUrl} progress={uploadPercentage} />
            </div>
          </div>
          <Separator />
          <div className="flex justify-between p-2">
            <div className="mt-3 flex gap-2">
              <TfiUpload className="h-6 w-6 text-UploadBlue" />
              <VscPass
                className={`h-6 w-6 ${
                  uploadPercentage !== 100
                    ? "text-darkBorder"
                    : "text-UploadBlue"
                }`}
              />
              {parseFloat(uploadPercentage.toFixed(0))}%
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-UploadBlue hover:bg-blue-500 disabled:bg-blue-400"
                // disabled={isLoading || uploadPercentage !== 100}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FullUpload;
