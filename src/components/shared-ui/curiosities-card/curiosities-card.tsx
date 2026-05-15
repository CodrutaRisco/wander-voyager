"use client";

import { useState } from "react";
import styles from "./curiosities-card.module.css";
import Image from "next/image";
import { StoryblokImageAndRichText } from "@/types";
import { renderRichText } from "@/lib/rich-text-renderer";
import { Modal } from "../modal/modal";


export function CuriositiesCard({ image, text }: StoryblokImageAndRichText) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // const title = image[0]?.title || "Curiosity Details";

  return (
    <>
      <article className={styles.curiosityCard} onClick={openModal}>
        <div className={styles.curiosityImageContainer}>
          <Image
            src={image[0]?.image?.filename || "/placeholder-image.jpg"}
            alt={image[0]?.image?.alt || "Curiosity Image"}
            fill
            className={styles.curiosityImage}
          />
        </div>
        <div className={styles.curiosityContent}>
          <h3 className={styles.curiositiesTitle}>{image[0]?.title || ""}</h3>
          <div className={styles.curiositiesText}>{renderRichText(text)}</div>
          <p className={styles.readMore}>Read full story</p>
        </div>
      </article>
      <Modal isOpen={showModal} onClose={closeModal}>
        <div className={styles.modalImageContainer}>
          <Image
            src={image[0]?.image?.filename || "/placeholder-image.jpg"}
            alt={image[0]?.image?.alt || "Curiosity Image"}
            fill
            className={styles.modalImage}
          />
        </div>
        <h3 className={styles.curiositiesModalTitle}>
          {image[0]?.title || ""}
        </h3>

        <div className={styles.curiositiesTextModal}>
          {renderRichText(text)}
        </div>
      </Modal>
    </>
  );
}