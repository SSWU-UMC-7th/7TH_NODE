export const responseFromReviews = (reviews) => {
    return {
      data: reviews,
      pagination: {
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
      },
    };
  };

  export const bodyToStore = (body) => {
    return {
        name: body.name
    };
  };

  export const responseFromStore = (store) => {
    return {
        id : store.id,
        name : store.name
    };
  };