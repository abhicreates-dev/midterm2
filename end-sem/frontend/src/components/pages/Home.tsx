//url : http://localhost:3000/
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Home(){

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [blogs, setBlogs] = useState<any[]>([]);
 
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/signin")
    }

    useEffect(() => {
        const fetchblog = async () => {

            if (!token) {
                navigate("/signin");
                return;
            }

            setIsLoading(true);

            

            const response = await axios.get("http://localhost:3001/api/v1/blogs/allblogs", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogs(response.data);
            setIsLoading(false);
        };

        fetchblog();
    }, []);

    

    return(
        <div className="w-screen overflow-hidden h-screen flex flex-col justify-between m-4">
            <nav className="w-full flex justify-between ">
                <div className="text-lg font-semibold">medium</div>
                <Button className="mr-8">LOG OUT</Button>
            </nav>
            <div className="grid grid-cols-4 gap-4">
                <div className="shadow-2xl bg-amber-50 flex flex-col gap-2 rounded-md">
                    <img src="https://miro.medium.com/v2/resize:fit:1400/1*PKkDpbB7iooZ6v5EjrgTKg.jpeg" className="rounded-md w-full h-full" />
                    {blogs.map((blog: any) => (
                        <div key={blog.id} className="m-2">
                        <div className="tracking-tight font-bold">
                        {blog.title}
                        </div>

                            <div className="truncate">
                                {blog.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>END</div>
        </div>
    )
}

