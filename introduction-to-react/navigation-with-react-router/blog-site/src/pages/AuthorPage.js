import Header from "../components/Header";
 
const AuthorPage = () => {
  return ( 
    <div>
      <Header/>
      <div className="container">
        <div className="inner-container">
          <h1>About the author: Anilcha</h1>
          <img src="./img/author.jpg" className="hero-image" alt="digital art of author Anilcha" />
          <p>Anilcha has always been passionated in web development. He started off with working as Graphic designer for websites then landed in frontend development. He built many beautiful and user-friendly websites and web apps that focuses on user goals. He had learned Vue.js But today he is learning React to create web apps and backend development too.</p>
        </div>
      </div>
    </div>
  );
}
 
export default AuthorPage;