import React from "react";
import styles from "./Information.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Star from "../../assets/starIcon.svg?react";
import tadcBillboard from "../../assets/tadc_billboard.png";
import Tag from "../../components/Tag/Tag";
import Bookmark from "../../components/Bookmark";
import WatchListBtn from "../../components/WatchListBtn/WatchListBtn";

function Information() {
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.bg}></div>
      <Navbar />
      <div className={styles.bgImg}></div>
      <div className={styles.contentLayer} style={{ padding: 32 }}>
        <div className={styles.topContent}>
          {/* Title & Description */}
          <div
            style={{ display: "flex", flexDirection: "column", color: "white" }}
          >
            <h1>The Amazing Digital Circus: The Last Act</h1>
            <p
              style={{
                color: "#7C7C7C",
                fontFamily: "Helvetica",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Movie · 2026 · Pg-13 · 1h 33m
            </p>
          </div>
          {/* Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              height: "fit-content",
            }}
          >
            <Star />
            {/* Stats box */}
            <span style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  8.5
                </span>
                <span
                  style={{ color: "#7c7c7c", fontSize: "20px", lineHeight: 1 }}
                >
                  /10
                </span>
              </p>
              <p style={{ color: "#7c7c7c", fontSize: "16px", lineHeight: 1 }}>
                194k
              </p>
            </span>
          </div>
        </div>

        <main
          style={{
            margin: "32px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            height: 500,
            gap: 32,
          }}
        >
          <img
            src={tadcBillboard}
            style={{ height: "100%", borderRadius: 32 }}
            alt="Movie Logo"
          />
          <iframe
            style={{ height: "100%", flex: 1, maxWidth: 800 }}
            src="https://www.youtube.com/embed/AjFk1cY265I?si=yTYtuuj3BIDB5i7m"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div
            style={{
              padding: 16,
              height: "100%",
              flex: 1,
              maxWidth: 350,
              display: "flex",
              flexDirection: "column",
              borderRadius: 24,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Helvetica",
                fontSize: 20,
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Available On:
            </p>
          </div>
        </main>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            gap: 8,
            alignItems: "center",
            alignSelf: "stretch",
            marginBottom: 32,
          }}
        >
          <Tag description="Action" />
          <Tag description="Comedy" />
          <Tag description="Romance" />
        </div>
        <p
          style={{
            color: " #FFF",
            fontFamily: "Helvetica",
            fontSize: 24,
            fontStyle: "normal",
            fontHeight: 400,
            lineHeight: "27px",
          }}
        >
          Jax finds himself and his friends trying to survive the circus after
          Caine died. what will happen? Will Pomni threaten to be the main
          character? Will Ragatha dare to steal greedy screentime? Will Zooble
          finally crack Gangle? Oh, and Caine’s dead ig. It all comes to a head
          this summer, in The Amazing Digital Circus: The Last Act.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        <WatchListBtn />
      </div>
    </div>
  );
}

export default Information;
