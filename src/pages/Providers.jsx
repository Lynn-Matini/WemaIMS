import SideNav from '../components/SideNav';
import Header from '../components/Header';

function Providers() {
  return (
    <div className="row">
      <Header />
      <div className="col-2">
        <SideNav />
      </div>
      <div className="col-10">
        <h1>Providers</h1>
      </div>
    </div>
  );
}

export default Providers;
