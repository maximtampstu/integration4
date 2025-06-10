// const ArticleSection = ({
//   title,
//   sectionTitle,
//   sectionNumber,
//   timelineTitle,
//   descriptionText,
//   arrowImageSrc,
// }) => {
//   return (
    
//       <section className="article__section">
//         <h3 className="article__section-title">{sectionTitle}</h3>
//         <p className="article__section-number">{sectionNumber}</p>
//         <section className="article__description-container">
//           <h4 className="visually-hidden">description box</h4>
//           <img
//             src={arrowImageSrc}
//             alt={arrowImageSrc}
//             className="article__arrow-image"
//           />
//           <section className="article__content">
//             <h5 className="article__timeline">{timelineTitle}</h5>
//             <p className="article__text">{descriptionText}</p>
//           </section>
//         </section>
//       </section>

//   );
// };

// export default ArticleSection;



import "./ArticleSection.css";

const ArticleSection = ({
  sectionTitle,
  sectionNumber,
  timelineTitle,
  descriptionText,
  arrowImageSrc,
  numberBg,      
  titleBg,       
}) => {
  return (
    <section className="article__section">
      <div className="article__section-header">
        
        <p
          className={`article__section-number article__section-number--${numberBg}`}
        >
          {sectionNumber}
        </p>
        <h3
          className={`article__section-title article__section-title--${titleBg}`}
        >
          {sectionTitle}
        </h3>
      </div>

      <div className="article__description-container">
        <img
          src={arrowImageSrc}
          alt=""
          className="article__arrow-image"
        />
        
          <h4 className="article__timeline">{timelineTitle}</h4>
          <p className="article__text">{descriptionText}</p>
        
      </div>
    </section>
  );
};

export default ArticleSection;
