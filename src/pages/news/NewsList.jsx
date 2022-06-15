import {  useState } from "react";

const NewsList = ({ charity }) => {
    const [active, setActive]=useState(0);

    const openModal=()=> {
        // navigate(`/news/${id}`);
        if(active===0)
        {
            setActive(1);
        }
        else{
            setActive(0);
        }
    }
    function RenderData(props) {
        return(
            <> <dd >Tổng số tiền đã được quyên góp: {charity.totalDonation} đồng <br/>
             </dd>;
            </>)
      }
    return (
        <>
        <bb onClick={(e)=>openModal()}>
        <dl class="dl-horizontal">
				<dt>
                <span class="label label-information">      TỪ THIỆN  </span>{charity.dateStart} - {charity.dateEnd}
            </dt>
            <dd>
                <h5>{charity.title}</h5>
            {charity.content}
            </dd>
            {active===1?
            <RenderData/>:""}

        </dl>
        </bb>
        </>
    );
};

export default NewsList;
