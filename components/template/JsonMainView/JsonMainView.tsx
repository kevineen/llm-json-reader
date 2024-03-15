import { useCallback, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { indexAtom, jsonDataAtom } from "@/state/atmos/jsonDataAtom";

import Button from "@/components/atoms/Button/Button";
import Card from "@/components/molecules/Card/Card";
import ArrowButton from "@/components/atoms/ArrowButton/ArrowButton";
import { parseJsonData } from "@/lib/utils/helpers/helpers";

export const JsonMainView = () => {
  const [jsonData, setJsonData] = useRecoilState(jsonDataAtom);

  const [index, setIndex] = useRecoilState(indexAtom);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrevClick = () => {
    setIndex((prevIndex: number) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setIndex((prevIndex: number) => Math.min(prevIndex + 1, jsonData.length - 1));
  };

  // useCallbackフックをuseEffectの外で定義
  const handleArrowKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      setIndex((prevIndex: number) => Math.min(prevIndex + 1, jsonData.length - 1));
    } else if (event.key === 'ArrowLeft') {
      setIndex((prevIndex: number) => Math.max(prevIndex - 1, 0));
    }
  }, [setIndex, jsonData.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleArrowKey);
    return () => {
      window.removeEventListener('keydown', handleArrowKey);
    };
  }, [handleArrowKey]);

  const handleLoadJsonFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (event.target.files?.length) {
      const file = event.target.files[0];

      fileReader.readAsText(file);
      fileReader.onload = () => {
        try {
          const content = fileReader.result as string;
          const jsonData = parseJsonData(content);
          setJsonData(jsonData);
        } catch (error) {
          console.error('ファイルの読み込みに失敗しました。', error);
        }
      };
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="w-1/3 flex justify-start">
          <ArrowButton
            direction="left"
            onClick={handlePrevClick}
            disabled={index === 0}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <Button onClick={handleLoadJsonFile}>
            ファイル読込
          </Button>
          <input
            type="file"
            accept=".json,.jsonl"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <ArrowButton
            direction="right"
            onClick={handleNextClick}
            disabled={index === jsonData.length - 1}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 前のデータを表示 */}
        <div className="col-span-1">
          {index === 0 ? (
            <Card
              title="開始位置"
              content=""
              displayMode="prev"
            />
          ) : (
            <Card
              title="Previous Data"
              content={JSON.stringify(jsonData[index - 1], null, 2)}
              displayMode="prev"
              onClick={() => setIndex(index - 1)}
            />
          )}
        </div>

        {/* 次のデータを表示 */}
        <div className="col-span-1">
          {index === jsonData.length - 1 ? (
            <Card
              title="最終位置"
              content=""
              displayMode="next"
            />
          ) : (
            <Card
              title="Next Data"
              content={JSON.stringify(jsonData[index + 1], null, 2)}
              displayMode="next"
              onClick={() => setIndex(index + 1)}
            />
          )}
        </div>

        {/* 選択中のデータを表示 */}
        <div className="col-span-2">
          <Card
            title="Selected Data"
            content={JSON.stringify(jsonData[index], null, 2)}
            displayMode="selected"
          />
        </div>
      </div>
    </div>
  );
}

export default JsonMainView;
