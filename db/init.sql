--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Homebrew)
-- Dumped by pg_dump version 15.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    id_author integer NOT NULL,
    name character varying,
    lastname character varying,
    date_of_birth date,
    email character varying,
    phone_number character varying,
    username character varying(100),
    password character varying(100)
);


--
-- Name: post_id_post_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_post_seq
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    id_post integer DEFAULT nextval('public.post_id_post_seq'::regclass) NOT NULL,
    title character varying,
    date date,
    image character varying,
    text text,
    id_author integer
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.author VALUES (1, 'Ana', 'Oviedo', NULL, NULL, NULL, 'ana', 'ana');


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post VALUES (1, 'Actual foundations of mathematics', '2025-02-25', './src/assets/math_pink.jpg', NULL, 1);
INSERT INTO public.post VALUES (2, 'Feynman: the inspiration', '2025-02-25', './src/assets/feynman.jpg', NULL, 1);
INSERT INTO public.post VALUES (3, 'Father of computation', '2025-02-25', './src/assets/turing.jpg', NULL, 1);
INSERT INTO public.post VALUES (4, 'What is math really?', '2025-02-25', './src/assets/girl.jpg', NULL, 1);
INSERT INTO public.post VALUES (5, 'math logic', '2026-04-23', './src/assets/uploads/love.jpg', 'math logic is hard but i love it and its beautiful', NULL);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES ('jxqpIafyFYrXM9qxKuyosnDlwnGf7wpy', '{"cookie":{"originalMaxAge":600000,"expires":"2026-04-29T01:54:25.502Z","secure":false,"httpOnly":true,"path":"/"},"id_author":1}', '2026-04-28 19:59:19');


--
-- Name: post_id_post_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_id_post_seq', 5, true);


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id_author);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: post post_id_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_id_author_fkey FOREIGN KEY (id_author) REFERENCES public.author(id_author);


--
-- PostgreSQL database dump complete
--

