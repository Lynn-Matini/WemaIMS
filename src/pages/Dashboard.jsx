import React from 'react';
import SideNav from '../components/SideNav';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <>
      <div className="row">
        <Header />
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10 mt-5">
          <div className="row mb-5">
            <div className="col-3 ms-5">
              <div className="dashboardDescription">
                <p className="pTitle">6</p>
                <p className="description">Number of Applied Products</p>
              </div>
            </div>
            <div className="col-3 ">
              <div className="dashboardDescription">
                <p className="pTitle">4</p>
                <p className="description">Number of Claims</p>
              </div>
            </div>
            <div className="col-3">
              <div className="dashboardDescription">
                <p className="pTitle">2</p>
                <p className="description">Pending Approval</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-3 ms-5">
              <div className="dashboardDescription">
                <p className="pTitle">4</p>
                <p className="description">Policy Categories</p>
              </div>
            </div>
            <div className="col-3">
              <div className="dashboardDescription">
                <p className="pTitle">0</p>
                <p className="description">Total Questions Asked</p>
              </div>
            </div>
            <div className="col-3">
              <div className="dashboardDescription">
                <p className="pTitle">42</p>
                <p className="description">
                  Number of Available Health Providers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
