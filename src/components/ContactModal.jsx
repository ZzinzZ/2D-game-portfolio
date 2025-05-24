import React from 'react'
import Social from './Social';

const ContactModal = ({isOpen, onClose}) => {
    if (!isOpen) return null;
  return (
    <div className="project-modal">
      <div className="modal-contact-content">
        <img src='/assets/avatar.jpg' className='contact-avatar'/>
        <h2>Nguyễn Nhật Anh</h2>
        <span className='job-title'>Web developer</span>
        <div className="social-container">
            <Social/>
        </div>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  )
}

export default ContactModal