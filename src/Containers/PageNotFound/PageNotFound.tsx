
import classes from './PageNotFound.module.scss';

const PageNotFound = () => {


  return (
    <>
      <div className={classes.errorWrapper}>
        <h1 className={classes.heading}>404</h1>
        <h2 className={classes.desc}>Page Not Found</h2>
      </div>
    </>
  )
}

export default PageNotFound;