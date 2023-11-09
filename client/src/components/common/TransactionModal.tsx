import { IoIosCheckmarkCircle } from "react-icons/io";
import { FiXCircle } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState } from "react";

interface TransactionModalProps {
  text: string
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

export default function TransactionModal({ text, isSuccess, isLoading, isError }: TransactionModalProps) {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);

  useEffect(() => {
    if (isLoading || isSuccess || isError) {
      setIsMintModalOpen(true);

      // Set a timeout to hide the modal after a short period (e.g., 2 seconds).
      if (isSuccess || isError) {
        const timeoutId = setTimeout(() => {
          setIsMintModalOpen(false);
        }, 2000);

        // Clear the timeout when the component unmounts to prevent memory leaks.
        return () => {
          clearTimeout(timeoutId);
        };
      }
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      {isMintModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40" />
          <div className="w-[min(30vw)] p-6 bg-gray-dark rounded-lg relative z-50">
            {isLoading ? (
              <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="font-ibm font-semibold text-gray-light text-xl text-center">
                  { text }
                </h2>
                <BeatLoader color="#ff7ac6" loading={isLoading} />
              </div>
            ) : isSuccess ? (
              <div className="flex flex-row-reverse justify-center gap-2 items-center">
                <h2 className="font-ibm font-semibold text-gray-light text-xl text-center">
                  Successful {text.toLowerCase()}!
                </h2>
                <IoIosCheckmarkCircle className="text-purple w-6 h-6" />
              </div>
            ) : isError ? (
              <div className="flex flex-row-reverse justify-center gap-2 items-center">
                <h2 className="font-ibm font-semibold text-gray-light text-xl text-center">
                  Ups! Something went wrong
                </h2>
                <FiXCircle className="text-purple w-6 h-6" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}