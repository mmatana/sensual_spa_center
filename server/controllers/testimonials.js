const apiResponse = require('../helpers/apiResponse');
const asyncMiddleware = require('../middleware/async');
const client = require('../database');

exports.addTestimonial = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { description } = req.body;
    if (!description) return apiResponse.ErrorResponse(res, 'Please add description');

    const newTestimonial = await client.query(`INSERT INTO public.testimonial ( user_id, description ) VALUES (${req.user.user_id},'${description}')`);
    if (newTestimonial.rowCount === 0) return apiResponse.ErrorResponse(res, 'Error adding testimonial');

    const { rows } = await client.query(`
        SELECT
            public.testimonial.description,
            public.testimonial.testimonial_id,
            public.user.user_full_name
        FROM public.testimonial
        INNER JOIN
            public.user
        ON
            public.testimonial.user_id = public.user.user_id
        WHERE
            public.user.user_id = ${req.user.user_id}
        `);

    return apiResponse.successResponseWithData(res, 'Testimonial added', rows);
  });
};

exports.listTestimonials = () => {
  return asyncMiddleware(async (req, res, next) => {
    const { rows } = await client.query(`
        SELECT
            public.testimonial.description,
            public.testimonial.testimonial_id,
            public.user.user_full_name
        FROM public.testimonial
        INNER JOIN
            public.user
        ON
            public.testimonial.user_id = public.user.user_id
        WHERE
            public.user.user_id = ${req.user.user_id}
        `);

    return apiResponse.successResponseWithData(res, 'Testimonials found', rows);
  });
};
