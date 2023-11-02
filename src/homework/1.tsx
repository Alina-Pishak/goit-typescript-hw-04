import { useEffect, useRef, ReactNode } from "react";

type ObserverProps = {
  children: ReactNode;
  onContentEndVisible: () => void;
};

type Options = {
  rootMargin: string;
  threshold: number;
  root: null;
};

// class Options {
//   constructor(
//     private rootMargin: string,
//     private threshold: number,
//     private root: null
//   ) {}
// }

// Опишіть Props
export function Observer({ children, onContentEndVisible }: ObserverProps) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: Options = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
