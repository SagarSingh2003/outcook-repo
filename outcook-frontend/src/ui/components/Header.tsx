import { mockFilter } from "@/atoms/mockFilter";;
import { useRecoilState } from "recoil";

export default function Header() {
  const [filter, setFilter] = useRecoilState(mockFilter);
  // const [_ , setShowComposeModal] = useRecoilState<any>(composeModal)
  const handleChangeTab = (filterCode: string) => {
      setFilter(filterCode)
  };

  return (
    <header className="header">
      <span>Filter By :</span>
      <section className="header-section-nav" style={{fontSize : "14px" , fontWeight : "semibold"}}>
        <span
          onClick={() => handleChangeTab("unread")}
          style={
            filter === "unread" ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}
          }
        >
          Unread
        </span>
        <span
          onClick={() => handleChangeTab("read")}
          style={
            filter === "read" ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}
          }
        >
          Read
        </span>
        <span
          onClick={() => {

              handleChangeTab("favorite")
            }
          }
          style={
            filter === "favorite" ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}
          }
        >
          Favorites
        </span>
      </section>
    </header>
  );
}
