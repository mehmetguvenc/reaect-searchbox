import { useEffect, useState } from 'react';
import { fetchData } from '../actions/fetch';
import './style.scss'

export type Client = {
    id: number,
    fullname: string,
    email: string,
    phone: string,
    policyNumber: string,
    username: string,
    website: string
}

const List = () => {

    const [clients, setClients] = useState<Client[]>();
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    useEffect(() => {
        fetchData()
            .then((res) => {
                setClients(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <div className="list">
            <div className="container">
                <div className="search">
                    <div className="icon">
                        <img src={require("../assets/search.svg").default} />
                    </div>
                    <input type="text" placeholder='SEARCH (Client name / Policy Number)' onChange={(e) => (setSearchKeyword(e.target.value))} />
                </div>
                <div className="table">
                    {
                        clients &&
                        clients.map((e) => {
                            if (e.fullname.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1 || (e.policyNumber.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1)) {
                                return (
                                    <div className="row" key={"row-key-" + e.id}>
                                        <div className="fullname">
                                            {e.fullname}
                                        </div>
                                        <div className="bottom">
                                            <div className="phone">
                                                <img src={require("../assets/phone.svg").default} />
                                                {e.phone}
                                            </div>
                                            <div className="email">{e.email}</div>
                                            <div className="policy">
                                                <img src={require("../assets/file.svg").default} />
                                                {e.policyNumber}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default List;
