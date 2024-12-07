import { composeModal } from "@/atoms/composeModal";
import { currentFilterCode } from "@/atoms/filter";
import { filter_map } from "@/constants/filter_code";
import { useRecoilState } from "recoil";

export default function Header() {
  const [filter, setFilter] = useRecoilState(currentFilterCode);
  const [_ , setShowComposeModal] = useRecoilState<any>(composeModal)
  const handleChangeTab = (filterCode: number) => {
    setFilter(filterCode);
  };

  return (
    <header className="header">
      <span>Filter By :</span>
      <section className="header-section-nav" style={{fontSize : "14px" , fontWeight : "semibold"}}>
        <span
          onClick={() => handleChangeTab(0)}
          style={
            filter === 0 ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}
          }
        >
          {filter_map[0].toString()}
        </span>
        <span
          onClick={() => handleChangeTab(1)}
          style={
            filter === 1 ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}
          }
        >
          {filter_map[1].toString()}
        </span>
        <span
          onClick={() => {
              setShowComposeModal(true)
              handleChangeTab(2)
            }
          }
          style={
            filter === 2 ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}
          }
        >
          send
        </span>
      </section>
    </header>
  );
}
