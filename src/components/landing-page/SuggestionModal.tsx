"use client";

import axios from "axios";
import React, { type FormEvent, useState, ChangeEvent } from "react";

interface SuggestSourceParams {
  title: string;
  media: string;
  targetRepository: string;
}

export async function suggestSource({
  title,
  media,
  targetRepository,
}: SuggestSourceParams): Promise<string> {
  try {
    const response = await axios.post("/api/suggestSource", {
      title,
      media,
      targetRepository,
    });

    return response.data.pr_url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to suggest source"
      );
    }
    throw error;
  }
}

type SuggestModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

type FormValues = {
  title: string;
  url: string;
};

const defaultFormValues = {
  title: "",
  url: "",
} satisfies FormValues;

const SuggestModal = ({ handleClose, isOpen }: SuggestModalProps) => {
  const [urlError, setUrlError] = useState("");
  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [isLoading, setIsLoading] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const resetAndCloseForm = () => {
    setFormValues(defaultFormValues);
    setUrlError("");
    setPrUrl(null);
    setErrorMessage("");
    handleClose();
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((v) => ({ ...v, url: e.target.value }));
    setUrlError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setPrUrl(null);

    try {
      const newPrUrl = await suggestSource({
        title: formValues.title,
        media: formValues.url,
        // This is based on the review frontend implementation
        // TODO: find a way to test the workflow on a different repo
        targetRepository: "btc transcript",
      });
      setPrUrl(newPrUrl);
      setFormValues(defaultFormValues);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred while suggesting the source"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formIsComplete = !!(formValues.title.trim() && formValues.url.trim());

  return (
    <div
      className={`flex z-10 items-center justify-center h-screen top-0 bottom-0 right-0 left-0 ${
        isOpen ? "fixed" : "hidden"
      }`}
    >
      <div
        onClick={resetAndCloseForm}
        className={`z-10 max-h-screen fixed bg-[#0000007f] top-0 bottom-0 right-0 left-0 ${
          isOpen ? "flex" : "hidden"
        }`}
      ></div>
      {isOpen ? (
        <div className="max-w-[580px] z-50 max-h-[80vh] overflow-y-auto rounded-[20px] w-fit bg-white p-10 shadow-md max-md:max-w-[400px] flex flex-col gap-10 border border-gray-custom-600 max-md:p-4 max-md:gap-6 max-md:mx-3">
          <section className="flex flex-col gap-5">
            <p className="text-3xl font-medium max-md:text-xl text-center">
              Suggest a Source for Transcription
            </p>
            <p className="md:text-base max-md:text-sm text-center text-custom-black-custom-100">
              We manually review every suggestion to ensure it meets our
              standards for reliable, technical Bitcoin content.
            </p>
          </section>

          <form onSubmit={handleSubmit}>
            <section className="flex flex-col gap-8 max-md:gap-6 w-full">
              <section className="w-full flex flex-col gap-1.5">
                <p className="font-semibold text-custom-black-custom-100">
                  Title
                </p>
                <input
                  placeholder="Add transcript title"
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      title: e.target.value,
                    }))
                  }
                  required
                  className="px-2 py-2 lg:py-[10px] border border-gray-custom-300 rounded-[10px] focus:border-custom-accent focus:outline-none w-full min-h-[48px]"
                />
              </section>
              <section className="w-full flex flex-col gap-1.5">
                <p className="font-semibold text-custom-black-custom-100">
                  Source&apos;s URL
                </p>
                <input
                  type="url"
                  placeholder="https://"
                  value={formValues.url}
                  onChange={handleUrlChange}
                  required
                  maxLength={255}
                  className="px-2 py-2 lg:py-[10px] border border-gray-custom-300 rounded-[10px] focus:border-custom-accent focus:outline-none w-full min-h-[48px]"
                />
                <p
                  className={`text-sm font-medium max-md:text-xs text-custom-black-custom-100 ${
                    urlError ? "text-red-500" : undefined
                  }`}
                >
                  {urlError
                    ? urlError
                    : "Please enter the full URL, including http:// or https://"}
                </p>
              </section>
              {prUrl && (
                <p className="text-green-500 text-sm font-medium">
                  Source suggested successfully! PR created at:{" "}
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {prUrl}
                  </a>
                </p>
              )}
              {errorMessage && (
                <p className="text-red-500 text-sm font-medium">
                  {errorMessage}
                </p>
              )}
              <div className="w-full flex gap-4 max-md:gap-2">
                <button
                  className="text-white bg-gray-custom-300 py-3 w-full font-bold mx-auto text-sm lg:text-base bg-custom-otherLight rounded-[10px]"
                  onClick={resetAndCloseForm}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-orange-custom-100 py-3 w-full font-bold mx-auto text-sm lg:text-base bg-custom-otherLight rounded-[10px] disabled:opacity-50"
                  disabled={!formIsComplete || isLoading}
                  type="submit"
                >
                  {isLoading ? "Suggesting..." : "Suggest source"}
                </button>
              </div>
            </section>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestModal;
