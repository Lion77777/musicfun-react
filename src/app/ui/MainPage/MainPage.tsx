import { useGetMeQuery } from "@/features/auth/api/authApi"

export const MainPage = () => {
    const { data } = useGetMeQuery()

    return (
        <>
            <h1>Main Page</h1>
            <div>login: {data?.login}</div>
        </>
    )
}