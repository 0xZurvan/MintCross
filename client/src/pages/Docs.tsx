interface Props {
  step: string;
}

function Step({ step }: Props) {
  return (
    <p className="w-8 h-8 font-ibm bg-purple rounded-full text-white text-sm text-center flex items-center justify-center">
      {step}
    </p>
  );
}

export default function Docs() {
  return (
    <div className="flex flex-col items-center space-y-10 bg-gray-dark w-[min(44vw)] mx-auto p-8 rounded-lg">
      <h1 className="text-white text-xl lg:text-3xl font-ibm font-bold text-center">
        INSTRUCTIONS
      </h1>
      <ul className="flex flex-col justify-center items-center space-y-8">
        <li className="flex flex-col justify-center items-center gap-2">
          <Step step="1" />
          <span className="text-white text-base text-center lg:text-xl font-ibm font-medium">
            Make sure you have enough balance of the native chain token to pay
            for gas. If not get some by claiming it for free in their respective
            faucets.
          </span>
        </li>
        <li className="flex flex-col justify-center items-center gap-2">
          <Step step="2" />
          <span className="text-white text-base text-center lg:text-xl font-ibm font-medium">
            Make sure you have enough balance of the ERC20 token by minting
            first in the mint page.
          </span>
        </li>
        <li className="flex flex-col justify-center items-center gap-2">
          <Step step="3" />
          <span className="text-white text-base text-center lg:text-xl font-ibm font-medium">
            Select the network you want to send from, the amount of tokens you
            want to send and the address you want to send it to.
          </span>
        </li>
      </ul>
    </div>
  );
}
