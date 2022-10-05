import { useReducer, useRef } from 'react'

export default async function fetcher<T = unknown>(input: RequestInfo | URL, init?: RequestInit) {
    return fetch(input, init).then(res => (res.json() as T))
}

interface State {
    isLoading: boolean,
}

interface HookResponse<T = unknown> extends State {
    reFetch: <A = unknown>(p: A) => Promise<{ data: T, error: Error }>,
    controller: AbortController
}

type Action = { type: 'loading' | 'fetched' | 'error' }

/**
 * A custom react hook to make api requests. 
 * 
 * Based on:
 * 
 * https://usehooks-ts.com/react-hook/use-fetch
 * 
 * @param url Url to make the request
 * @param options request configurations
 * @returns T
 */
export function useFetch<T = unknown>(url?: string, options?: RequestInit): HookResponse<T> {
    const controller = new AbortController()
    const signal = controller.signal

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false)

    const initialState: State = {
        isLoading: false,
    }

    // Keep state logic separated
    const fetchReducer = (state: State, action: Action): State => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, isLoading: true }
            case 'fetched':
                return { ...initialState, isLoading: false }
            case 'error':
                return { ...initialState }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    cancelRequest.current = false

    const reFetch = async <B = unknown>(payload: B) => {
        let d: T, e: Error;

        dispatch({ type: 'loading' })

        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json"
                },
                ...options,
                body: JSON.stringify(payload),
                signal,
            })

            if (!response.ok) {
                const data = (await response.json()) as Error

                throw new Error(data.message || response.statusText)
            }

            const data = (await response.json()) as T

            if (cancelRequest.current) return

            dispatch({ type: 'fetched' })

            d = data
        } catch (error) {
            console.log("CATCH", { error })
            e = error
            if (cancelRequest.current) return

            dispatch({ type: 'error' })
        }

        return { data: d, error: e }
    }

    // useEffect(() => {
    //     if (loadOnMount) reFetch();

    //     // Use the cleanup function for avoiding a possibly...
    //     // ...state update after the component was unmounted
    //     return () => {
    //         cancelRequest.current = true
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [url])

    return { ...state, reFetch, controller }
}

export function excludeAndReturnReFetchCb<T = unknown>(a: HookResponse<T>) {
    const cb = a.reFetch
    delete a["reFetch"];
    return cb
}