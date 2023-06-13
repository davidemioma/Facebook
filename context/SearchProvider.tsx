import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const SearchContext = createContext<SearchProps | null>(null);

export const useSearchModal = () => useContext(SearchContext);

export const SearchProvider = ({ children }: ChildrenProps) => {
  const [text, setText] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    text.trim() ? setIsOpen(true) : setIsOpen(false);
  }, [text]);

  return (
    <SearchContext.Provider
      value={{
        text,
        setText,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
