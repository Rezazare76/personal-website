import { ReactNode } from "react";

export type onClickProps = {
  onClick?: (arg: any) => void;
};
export type classNameProps = {
  className?: string;
};
export type containerClassProps = {
  containerClass?: string;
};
export type childrenProps = { children: ReactNode };

export type regularFetchProps = {
  url: string;
  method?: "GET" | "PUT" | "DELETE" | "POST" | "PATCH";
  body?: any;
  header?: HeadersInit;
  done?: (a: any) => void;
  loading?: ((value: boolean) => void) | null;
  error?: ((rep: any) => void) | null;
  successMessage?: string;
  errorMessage?: string;
  redirect?: RequestRedirect;
  token?: string;
  formType?: boolean;
  argController?: AbortController;
  timeOut?: number;
};
export type swrFetcherProps = {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: any;
  redirect?: any;
};
export type modalsContainerSectionsType = "docState" | "docLoading" | null;
export type modalsContainerType = onClickProps &
  classNameProps & {
    sectionProps: modalsContainerSectionsType;
    setSectionProps: (arg: modalsContainerSectionsType) => void;
    darkClass?: string;
    defaultClass?: string;
    runFunctions?: boolean;
    data?: any;
    onclose?: () => void;
  };
