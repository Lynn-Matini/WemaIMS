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
          <div class="row mb-5">
            <div className="col-3 ms-5">
              <div class="dashboardDescription">
                <p class="pTitle">6</p>
                <p class="description">Number of Applied Products</p>
              </div>
            </div>
            <div className="col-3 ">
              <div class="dashboardDescription">
                <p class="pTitle">4</p>
                <p class="description">Number of Claims</p>
              </div>
            </div>
            <div className="col-3">
              <div class="dashboardDescription">
                <p class="pTitle">2</p>
                <p class="description">Pending Approval</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div className="col-3 ms-5">
              <div class="dashboardDescription">
                <p class="pTitle">4</p>
                <p class="description">Policy Categories</p>
              </div>
            </div>
            <div className="col-3">
              <div class="dashboardDescription">
                <p class="pTitle">0</p>
                <p class="description">Total Questions Asked</p>
              </div>
            </div>
            <div className="col-3">
              <div class="dashboardDescription">
                <p class="pTitle">42</p>
                <p class="description">Number of Available Health Providers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
