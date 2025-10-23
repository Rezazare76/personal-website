import { regularFetchProps } from "@/types/common";

export const scrollToTop = () => {
  if (typeof window == "undefined") return;
  document.getElementsByTagName("html")[0].scrollTo(0, 0);
};
export const regularFetch = async ({
  url,
  method = "POST",
  argController,
  body,
  done,
  error,
  errorMessage,
  formType,
  header,
  loading,
  redirect,
  successMessage,
  timeOut = 700000,
}: regularFetchProps) => {
  const defaultHeader = { "Content-Type": "application/json" };
  // Use provided AbortController or create a new one
  const controller = argController || new AbortController();
  const signal = controller.signal;
  // Set loading to true
  loading?.(true);
  // Create a timeout promise that rejects after 7 seconds
  let didTimeout = false;
  const timeoutPromise = new Promise<never>(() =>
    setTimeout(() => {
      controller.abort(); // Abort the fetch request
      didTimeout = true;
    }, timeOut),
  );
  try {
    // Race between the fetch request and the timeout
    const res = await Promise.race([
      fetch(url, {
        method,
        headers: {
          ...(header || defaultHeader),
        },
        redirect,
        body: body ? (formType ? body : JSON.stringify(body)) : null,
        signal,
      }),
      timeoutPromise, // Will reject if 7 seconds pass
    ]);
    if (res.ok) {
      const jsonData = await res.json();
      loading?.(false);
      done?.(jsonData);
      // if (successMessage) notifySuccess(successMessage);
    } else {
      const errorData: {
        message?: string;
        errorMessage?: string;
        errors?: string | { [keys: string]: string[] };
      } = await res.json();
      loading?.(false);
      error?.(errorData);
      const showError =
        errorMessage || errorData.message || errorData.errorMessage;

      if (
        typeof errorData.errors === "object" &&
        Object.keys(errorData.errors).length
      ) {
        // Object.values(errorData.errors).forEach((elm) =>
        //   // elm.forEach((value) => notifyError(value)),
        // );
      }

      // if (showError) notifyError(showError);
    }
  } catch (err: any) {
    loading?.(false);
    error?.(err);
    if (didTimeout) {
      // notifyError("درخواست بیش از حد طول کشید، لطفا دوباره تلاش کنید");
    } else if (err.name === "AbortError") {
      // notifyError("❌ درخواست قطع شد");
    } else {
      // notifyError("⚠️ خطای سرور");
    }
  }
};

//this is very useful for improve performance to add delay for event listeners or add delay for onChange inputs
export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  /* example use on input
  onChange={debounce((newValue: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Debounced value:", newValue.target.value);
  }, 400)}

  example on event listener
  const handleResize = () => {
      if (
        (screenSize > 1024 && window.innerWidth < 1024) ||
        (screenSize < 1024 && window.innerWidth > 1024)
      ) {
        setScreenSize(window.innerWidth);
        }
      };
  const debouncedResize = debounce(handleResize, 15);
  */
};

export const scrollToElementAndFocus = (
  elementId: string,
  block: ScrollLogicalPosition = "center",
) => {
  if (typeof window == "undefined") return null;
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: block,
    });
  }
};
