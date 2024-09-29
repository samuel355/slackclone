"use client";
import { createWorkSpace } from "@/actions/createWorkSpace";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCreateWorkspaceValues } from "@/hooks/create-workspace-values";
import React, { useState } from "react";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

const CreateWorkSpace = () => {
  const { currentStep } = useCreateWorkspaceValues();
  let stepInView = null;

  switch (currentStep) {
    case 1:
      stepInView = <Step1 />;
      break;

    case 2:
      stepInView = <Step2 />;
      break;

    case 3:
      stepInView = <Step3 />;
      break;

    default:
      stepInView = <Step1 />;
      break;
  }

  return (
    <div className="w-screen h-screen grid place-content-center bg-neutral-800 text-white ">
      <div className="p-5 max-w-[440px] border border-gray-300/10 rounded-sm">
        <Typography
          text={`step ${currentStep} of 2`}
          variant="p"
          className="mb-4 text-neutral-400"
        />

        {stepInView}
      </div>
    </div>
  );
};

export default CreateWorkSpace;

const Step1 = () => {
  const { name, updateValues, setCurrentStep } = useCreateWorkspaceValues();
  return (
    <>
      <Typography text="What is the name of your company" className="my-4" />
      <Typography
        text="This will be the name of your Slack workspace - choose something that you rtema will recognize"
        className="text-neutral-300"
        variant="p"
      />

      <form className="mt-6">
        <fieldset>
          <Input
            className="bg-neutral-700 text-white border-neutral-600"
            type="text"
            value={name}
            placeholder="Enter your company name"
            onChange={(event) => updateValues({ name: event.target.value })}
          />
          <Button
            type="button"
            className="mt-10"
            onClick={() => setCurrentStep(2)}
            disabled={!name}
          >
            <Typography text="Next" variant="p" />
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { name, setCurrentStep, updateImageUrl, imageUrl } =
    useCreateWorkspaceValues();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    //Creating workspace

    const slug = slugify(name);
    const invite_code = uuid();
    const error = await createWorkSpace({ name, slug, invite_code, imageUrl });
    setIsSubmitting(false);
  };

  return (
    <>
      <Button
        size={"sm"}
        className="text-white"
        variant={"link"}
        onClick={() => setCurrentStep(1)}
      >
        {" "}
        <Typography text="< Previous" variant="p" />
      </Button>

      <form>
        <Typography text="Add workspace avatar" className="my-4" />
        <Typography
          text="This image can be changed later in your workspace settings."
          className="text-neutral-300"
          variant="p"
        />
        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex-col items-center space-y-9"
        >
          {/* image component */}
          <div className="w-full border border-gray-300 rounded-md p-4">
            <ImageUpload />
          </div>
          <div className="space-x-5">
            <Button
              onClick={() => {
                updateImageUrl("");
                handleSubmit();
              }}
            >
              <Typography text="Skip for now" variant="p" />
            </Button>

            {imageUrl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size={"sm"}
                variant={"destructive"}
              >
                {" "}
                <Typography text="Submit" variant="p" />
              </Button>
            ) : (
              <Button
                type="button"
                size={"sm"}
                className="text-white bg-gray-500"
              >
                {" "}
                <Typography text="Select an Image" variant="p" />{" "}
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};

const Step3 = () => {
  const { name, updateValues, setCurrentStep } = useCreateWorkspaceValues();
  return <></>;
};
