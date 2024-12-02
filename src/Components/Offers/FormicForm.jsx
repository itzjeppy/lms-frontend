import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Styles/Modal.css";

const schema = Yup.object().shape({
  tier_id: Yup.string().required("Tier ID is required"),
  offerTitle: Yup.string().required("Offer title is required"),
  offerDescription: Yup.string().required("Offer description is required"),
  imageUrl: Yup.string().required("Image URL is required"),
  benefit: Yup.number().required("Benefit is required"),
  status: Yup.boolean().required("Status is required"),
});

const FormikForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        tier_id: "",
        offerTitle: "",
        offerDescription: "",
        imageUrl: "",
        benefit: 0,
        status: false,
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="modal-form">
          <h2 className="modal-heading">Add Offer</h2>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Tier ID:</label>
              <Field type="text" name="tier_id" className="modal-form-input" />
            </div>
            <ErrorMessage
              name="tier_id"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Offer Title:</label>
              <Field
                type="text"
                name="offerTitle"
                className="modal-form-input"
              />
            </div>
            <ErrorMessage
              name="offerTitle"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Offer Description:</label>
              <Field
                type="text"
                name="offerDescription"
                className="modal-form-input"
              />
            </div>
            <ErrorMessage
              name="offerDescription"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Image URL:</label>
              <Field type="text" name="imageUrl" className="modal-form-input" />
            </div>
            <ErrorMessage
              name="imageUrl"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Benefit:</label>
              <Field
                type="number"
                name="benefit"
                className="modal-form-input"
              />
            </div>
            <ErrorMessage
              name="benefit"
              component="div"
              className="modal-form-error"
            />
          </div>
          <div className="modal-form-group status">
            <div className="modal-form-group-inner">
              <label className="modal-form-label">Status:</label>
              <Field
                type="checkbox"
                name="status"
                className="modal-form-input status"
              />
            </div>
            <ErrorMessage
              name="status"
              component="div"
              className="modal-form-error"
            />
          </div>
          <button
            type="submit"   
            disabled={isSubmitting}
            className="modal-submit-btn"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
