import { useGetMeQuery } from "../../api/authApi"

export const ProfilePage = () => {
    const {data} = useGetMeQuery()

    return (
        <h1>{data?.login} Page</h1>
    )
}