import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../style/modules/stocks/profilestock.css"

function ProfileStock(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [profileData, serProfileData] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            const responseData = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${props.name}/asset-profile`,{
                headers: {
                    'X-RapidAPI-Key': '30c2da4a55msh871baf4c2d8a78dp16021cjsn9e4fdc286002',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            });

            serProfileData(responseData.data.assetProfile);

            setIsLoading(false);
        }
        fetchData();
    },[])

    return(
        <div className='main-profile'>
            <h3 className={"title-profile"}>Profile</h3>
            <div className="main-profile-detail">
                <div href={profileData ? profileData.website : '/'} className="website">
                    <div className="website-title">
                         website:
                    </div>
                    <div className="website-data">
                         {profileData? profileData.website : '-'}
                    </div>
                </div>
                <div className="country">
                    <div className="country-title">
                        Country:
                    </div>
                    <div className="country-data">
                         {profileData? profileData.country : '-'}
                    </div>
                </div>
                <div className="industry">
                    <div className="industry-title">
                        industry:
                    </div>
                    <div className="industry-data">
                         {profileData? profileData.industry : '-'}
                    </div>
                </div>
                <div className="sector">
                    <div className="sector-title">
                        SECTOR:
                    </div>
                    <div className="sector-data">
                         {profileData? profileData.sector : '-'}
                    </div>
                </div>
                <div className="employee">
                    <div className="employee-title">
                        employee:
                    </div>
                    <div className="employee-data">
                         {profileData? profileData.fullTimeEmployees : 0}
                    </div>
                </div>
                <div className="business-summary">
                    {profileData? profileData.longBusinessSummary : '-'}
                </div>
            </div>
        </div>
    );
}

export default ProfileStock;