import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureField({
  onChange,
}: {
  onChange: (dataUrl: string) => void;
}) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    onChange("");
  };

  const save = () => {
    if (!sigCanvas.current?.isEmpty()) {
      const dataUrl = sigCanvas.current.getCanvas().toDataURL("image/png");
      onChange(dataUrl);
    }
  };

  return (
    <div>
      <label className="block font-medium text-sm mb-2">Signature</label>
      <div className="border border-gray-300 rounded-md overflow-hidden">
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "bg-white"
          }}
          ref={sigCanvas}
          onEnd={save}
        />
      </div>
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={clear}
          className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={save}
          className="text-sm px-3 py-1 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}
