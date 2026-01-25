import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> Math1234 Calc 2 </h5>
              <p className="wd-dashboard-course-title">
                Math
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/7889" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> ENGW1234 Advanced Writing </h5>
              <p className="wd-dashboard-course-title">
                English
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
                <div className="wd-dashboard-course">
          <Link href="/courses/1000" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> BIO1234 Intro to Bio </h5>
              <p className="wd-dashboard-course-title">
                Biology
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
                <div className="wd-dashboard-course">
          <Link href="/courses/9028" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> SPNS1234 Elementary Spanish 1 </h5>
              <p className="wd-dashboard-course-title">
                Spanish
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
                <div className="wd-dashboard-course">
          <Link href="/courses/4321" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS2345 Computer Science </h5>
              <p className="wd-dashboard-course-title">
                Coding
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
                <div className="wd-dashboard-course">
          <Link href="/courses/4953" className="wd-dashboard-course-link">
            <Image src="/images/dashboardImage.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS4550 Web Design </h5>
              <p className="wd-dashboard-course-title">
                Web Development
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
      </div>
    </div>
);}
