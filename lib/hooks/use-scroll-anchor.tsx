import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [isAtBottom, scrollToBottom]);

  useEffect(() => {
    if (scrollRef.current) {
      const handleScroll = () => {
        if (scrollRef.current) {
          const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
          setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
        }
      };

      scrollRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      return () => {
        if (scrollRef.current) {
          scrollRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (visibilityRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
          });
        },
        { rootMargin: "0px 0px -100px 0px" }
      );

      observer.observe(visibilityRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible,
  };
};
