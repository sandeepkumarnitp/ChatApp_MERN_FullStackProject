export const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};


// export const asyncHandler = (func) => {
//   return  async(req, res, next) => {
//     try{
//       await func(req, res, next);
//     }catch(err){
//       next(err)
//     }
//   };
// };
