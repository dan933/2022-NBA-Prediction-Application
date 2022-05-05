import React from "react";
import { Routes, Route } from "react-router-dom";
import BasePage from "../components/Base";
import DefaultPage from "../components/Default";
import LoginPage from "../components/LoginPage/LoginPage";
import Dashboard from "../components/Menu";
import PlayerPage from '../components/PlayerPage/PlayerPage';
import TeamPage from "../components/TeamPage/TeamPage";

function RouteConfig() {
  return (
    <Routes>
        <Route path="/" element={<BasePage />}>
            <Route path="/" element={<DefaultPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<Dashboard />}>
                <Route path="players" element={<PlayerPage />} />
                <Route path="teams" element={<TeamPage />} />
            </Route>
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<DefaultPage />} />
        </Route>
    </Routes>
  );
}

export default RouteConfig;


